"use client";

import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const MODEL_PATH = "/models/female_head_sculpt.glb";

interface LiftingFaceProps {
  liftLevel: number; // 0 = 처진 상태, 1 = 1단계, 2 = 2단계, 3 = 3단계
}

// 커스텀 Shader Material for lifting effect
// uLiftIntensity: -1 = 처진 상태, 0 = 기본, 1~3 = 리프팅 단계
const liftingVertexShader = `
  uniform float uLiftIntensity;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;

    vec3 pos = position;

    // ========================================
    // 보호 영역 마스크 (눈, 코, 입 - 변형되면 안 됨)
    // 좌표계: X=앞뒤(코가 +), Y=높이, Z=좌우
    // ========================================

    // 눈 영역 보호 (넓게 잡아서 확실히 보호)
    float eyeProtectY = smoothstep(0.02, 0.08, pos.y) * smoothstep(0.22, 0.12, pos.y);
    float eyeProtectZ = smoothstep(0.02, 0.05, abs(pos.z)) * smoothstep(0.15, 0.08, abs(pos.z));
    float eyeProtectX = smoothstep(-0.02, 0.06, pos.x) * smoothstep(0.16, 0.10, pos.x);
    float eyeProtect = eyeProtectY * eyeProtectZ * eyeProtectX;

    // 코 영역 보호 (코 전체)
    float noseProtectY = smoothstep(-0.10, -0.02, pos.y) * smoothstep(0.15, 0.06, pos.y);
    float noseProtectZ = smoothstep(-0.04, 0.0, pos.z) * smoothstep(0.04, 0.0, pos.z); // 중앙만
    float noseProtectX = smoothstep(0.06, 0.10, pos.x); // 앞으로 튀어나온 부분
    float noseProtect = noseProtectY * noseProtectZ * noseProtectX;

    // 입술 영역 보호 (입술 전체)
    float lipProtectY = smoothstep(-0.16, -0.04, pos.y) * smoothstep(0.0, -0.08, pos.y);
    float lipProtectZ = smoothstep(-0.06, 0.0, pos.z) * smoothstep(0.06, 0.0, pos.z); // 중앙
    float lipProtectX = smoothstep(0.04, 0.10, pos.x); // 앞쪽
    float lipProtect = lipProtectY * lipProtectZ * lipProtectX;

    // 이마/눈썹 영역 보호
    float foreheadProtect = smoothstep(0.12, 0.16, pos.y);

    // 총 보호 마스크 (1 = 보호, 0 = 변형 가능)
    float protectedArea = max(max(max(eyeProtect, noseProtect), lipProtect), foreheadProtect);
    float deformable = 1.0 - protectedArea; // 변형 가능한 영역

    // ========================================
    // 처진 상태 (uLiftIntensity < 0일 때)
    // ========================================
    float sagAmount = max(-uLiftIntensity, 0.0); // 처짐 정도 (0~1)

    // === 볼살 처짐 - 볼이 아래로 크게 늘어짐 ===
    // 볼 영역: 광대뼈 아래 ~ 턱선 위, 귀 앞쪽 볼살
    float cheekSagY = smoothstep(-0.12, -0.02, pos.y) * smoothstep(0.08, 0.0, pos.y);
    float cheekSagZ = smoothstep(0.06, 0.12, abs(pos.z)) * smoothstep(0.20, 0.14, abs(pos.z)); // 옆쪽 볼
    float cheekSagX = smoothstep(-0.04, 0.04, pos.x) * smoothstep(0.12, 0.06, pos.x); // 중간~앞
    float cheekSag = cheekSagY * cheekSagZ * cheekSagX * deformable * sagAmount * 0.08;

    // === 턱선 처짐 - 이중턱/턱살 효과 ===
    // 턱 라인 (입 아래 ~ 턱 끝)
    float jawSagY = smoothstep(-0.25, -0.12, pos.y) * smoothstep(-0.06, -0.16, pos.y);
    float jawSagZ = smoothstep(0.0, 0.08, abs(pos.z)) * smoothstep(0.18, 0.12, abs(pos.z)); // 입 옆 피해서
    float jawSagX = smoothstep(-0.08, 0.02, pos.x) * smoothstep(0.10, 0.04, pos.x);
    float jawSag = jawSagY * jawSagZ * jawSagX * deformable * sagAmount * 0.10;

    // === 팔자주름 영역 - 코 옆에서 입가로 ===
    // 코 옆 볼살이 처지면서 생기는 주름 (입술 영역 피하기)
    float nasolabialY = smoothstep(-0.08, -0.02, pos.y) * smoothstep(0.04, 0.0, pos.y);
    float nasolabialZ = smoothstep(0.04, 0.06, abs(pos.z)) * smoothstep(0.12, 0.08, abs(pos.z)); // 코 바로 옆 피해서
    float nasolabialX = smoothstep(0.02, 0.06, pos.x) * smoothstep(0.12, 0.08, pos.x);
    float nasolabialSag = nasolabialY * nasolabialZ * nasolabialX * deformable * sagAmount * 0.06;

    // === 팔자주름 홈 파기 (깊은 주름선) ===
    float foldLineY = smoothstep(-0.06, -0.01, pos.y) * smoothstep(0.02, -0.02, pos.y);
    float foldLineZ = smoothstep(0.04, 0.05, abs(pos.z)) * smoothstep(0.08, 0.06, abs(pos.z));
    float foldLineX = smoothstep(0.04, 0.08, pos.x);
    float nasolabialFold = foldLineY * foldLineZ * foldLineX * deformable * sagAmount * 0.04;

    // === 입가 처짐 (마리오네트 라인) - 입술 옆 ===
    float marionetteY = smoothstep(-0.14, -0.08, pos.y) * smoothstep(-0.04, -0.10, pos.y);
    float marionetteZ = smoothstep(0.05, 0.07, abs(pos.z)) * smoothstep(0.12, 0.09, abs(pos.z)); // 입 옆
    float marionetteX = smoothstep(0.02, 0.06, pos.x);
    float marionetteSag = marionetteY * marionetteZ * marionetteX * deformable * sagAmount * 0.05;

    // 처짐 적용 - 아래로 + 앞으로 (볼륨 늘어남)
    float totalSag = cheekSag + jawSag + nasolabialSag + marionetteSag;
    pos.y -= totalSag;
    pos.x += (cheekSag + jawSag) * 0.4; // 앞으로 살짝 튀어나옴
    pos.z += sign(pos.z) * cheekSag * 0.3; // 옆으로 살짝 퍼짐

    // 팔자주름은 안쪽으로 (홈 파기)
    pos.x -= nasolabialFold;

    // ========================================
    // 리프팅 효과 (uLiftIntensity > 0일 때)
    // ========================================
    float liftAmount = max(uLiftIntensity, 0.0); // 리프팅 정도 (0~3)

    // 볼 영역 리프팅 - 볼살을 위로 끌어올림
    float cheekLiftY = smoothstep(-0.10, -0.02, pos.y) * smoothstep(0.06, 0.0, pos.y);
    float cheekLiftZ = smoothstep(0.06, 0.10, abs(pos.z)) * smoothstep(0.18, 0.14, abs(pos.z));
    float cheekLiftX = smoothstep(-0.02, 0.04, pos.x) * smoothstep(0.10, 0.06, pos.x);
    float cheekLift = cheekLiftY * cheekLiftZ * cheekLiftX * deformable * liftAmount * 0.025;

    // 턱선 리프팅 - V라인 효과
    float jawLiftY = smoothstep(-0.22, -0.12, pos.y) * smoothstep(-0.06, -0.16, pos.y);
    float jawLiftZ = smoothstep(0.02, 0.08, abs(pos.z)) * smoothstep(0.16, 0.12, abs(pos.z));
    float jawLiftX = smoothstep(-0.06, 0.02, pos.x) * smoothstep(0.08, 0.04, pos.x);
    float jawLift = jawLiftY * jawLiftZ * jawLiftX * deformable * liftAmount * 0.02;

    // 광대 볼륨 - 위로 올라가면서 볼륨감 (눈 아래 피하기)
    float cheekboneY = smoothstep(-0.02, 0.04, pos.y) * smoothstep(0.10, 0.06, pos.y);
    float cheekboneZ = smoothstep(0.08, 0.12, abs(pos.z)) * smoothstep(0.18, 0.14, abs(pos.z));
    float cheekboneX = smoothstep(0.0, 0.06, pos.x) * smoothstep(0.12, 0.08, pos.x);
    float cheekboneLift = cheekboneY * cheekboneZ * cheekboneX * deformable * liftAmount * 0.018;

    // 팔자주름 영역 개선 (리프팅 시 주름 펴짐)
    float nasolabialLiftY = smoothstep(-0.06, -0.01, pos.y) * smoothstep(0.02, -0.02, pos.y);
    float nasolabialLiftZ = smoothstep(0.04, 0.06, abs(pos.z)) * smoothstep(0.10, 0.07, abs(pos.z));
    float nasolabialLiftX = smoothstep(0.03, 0.07, pos.x);
    float nasolabialLift = nasolabialLiftY * nasolabialLiftZ * nasolabialLiftX * deformable * liftAmount * 0.015;

    // 리프팅 적용 - 위로 + 뒤로 (당겨지는 느낌)
    float totalLift = cheekLift + jawLift + cheekboneLift;
    pos.y += totalLift;
    pos.x -= totalLift * 0.25; // 뒤로 당겨짐

    // 턱선 안쪽으로 (V라인)
    pos.z -= sign(pos.z) * jawLift * 0.4;

    // 광대는 약간 바깥으로 (볼륨감)
    pos.z += sign(pos.z) * cheekboneLift * 0.25;

    // 팔자주름 펴짐 (앞으로 볼륨 복원)
    pos.x += nasolabialFold * 0.5; // 처짐 때 들어간 만큼 복원
    pos.x += nasolabialLift;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const liftingFragmentShader = `
  uniform float uLiftIntensity;
  uniform vec3 uSkinColor;
  uniform vec3 uHighlightColor;
  uniform vec3 uSagColor;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  // ============================================
  // Simplex Noise 함수 (피부 질감 생성용)
  // ============================================
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

    // Permutations
    i = mod289(i);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    // ========================================
    // 피부 디테일 생성 (Procedural Skin Detail)
    // ========================================
    
    // 1. 노이즈를 이용한 미세한 피부 요철 (Pores)
    float poreNoise = snoise(vPosition * 80.0); // 고빈도 노이즈
    float skinTexture = smoothstep(-1.0, 1.0, poreNoise) * 0.1; // 강도 조절
    
    // 법선 벡터(Normal)를 노이즈로 살짝 왜곡하여 질감 표현
    vec3 bumpyNormal = normalize(vNormal + vec3(poreNoise * 0.05)); 

    // 2. 피부 톤 변화 (Color Variation)
    // 노이즈를 크게 사용하여 피부 톤의 얼룩덜룩함(혈색) 표현
    float toneNoise = snoise(vPosition * 8.0);
    float redness = smoothstep(0.2, 0.8, toneNoise) * 0.1;

    // ========================================
    // 얼굴 부위별 마스크 정의
    // 모델 좌표 (옆모습 기준):
    // - Y = 높이 (위/아래)
    // - X = 앞뒤 (코가 +X 방향, 뒤통수가 -X)
    // - Z = 좌우 (귀 방향)
    // ========================================

    // 정면 마스크 (X가 앞쪽일수록 = 코/이마 쪽)
    float frontMask = smoothstep(-0.05, 0.10, vPosition.x);

    // 눈 영역 - Y가 높이, Z가 좌우
    float eyeY = smoothstep(0.05, 0.10, vPosition.y) * smoothstep(0.18, 0.12, vPosition.y);
    float eyeX = smoothstep(0.02, 0.08, vPosition.x) * smoothstep(0.14, 0.10, vPosition.x); // 앞쪽
    float leftEye = smoothstep(0.02, 0.04, vPosition.z) * smoothstep(0.10, 0.06, vPosition.z);
    float rightEye = smoothstep(-0.10, -0.06, vPosition.z) * smoothstep(-0.02, -0.04, vPosition.z);
    float eyeMask = eyeY * eyeX * (leftEye + rightEye);

    // 눈썹 영역 - 눈 위쪽
    float browY = smoothstep(0.14, 0.17, vPosition.y) * smoothstep(0.23, 0.20, vPosition.y);
    float browX = smoothstep(0.0, 0.06, vPosition.x) * smoothstep(0.12, 0.08, vPosition.x);
    float leftBrow = smoothstep(0.01, 0.03, vPosition.z) * smoothstep(0.12, 0.08, vPosition.z);
    float rightBrow = smoothstep(-0.12, -0.08, vPosition.z) * smoothstep(-0.01, -0.03, vPosition.z);
    float browMask = browY * browX * (leftBrow + rightBrow);

    // 입술 영역 - 코 아래, 중앙
    float lipY = smoothstep(-0.12, -0.06, vPosition.y) * smoothstep(-0.02, -0.08, vPosition.y);
    float lipX = smoothstep(0.06, 0.12, vPosition.x); // 앞쪽으로 튀어나온 부분
    float lipZ = smoothstep(-0.05, 0.0, vPosition.z) * smoothstep(0.05, 0.0, vPosition.z); // 중앙
    float lipMask = lipY * lipX * lipZ;

    // 윗입술 / 아랫입술 구분
    float upperLip = smoothstep(-0.06, -0.04, vPosition.y) * smoothstep(-0.02, -0.05, vPosition.y);
    float lowerLip = smoothstep(-0.10, -0.07, vPosition.y) * smoothstep(-0.04, -0.08, vPosition.y);

    // 볼 영역 (블러셔) - 눈 아래, 옆쪽
    float blushY = smoothstep(-0.02, 0.04, vPosition.y) * smoothstep(0.12, 0.06, vPosition.y);
    float blushX = smoothstep(-0.02, 0.04, vPosition.x) * smoothstep(0.10, 0.06, vPosition.x);
    float blushZ = smoothstep(0.04, 0.08, abs(vPosition.z)) * smoothstep(0.14, 0.10, abs(vPosition.z));
    float blushMask = blushY * blushX * blushZ;

    // 코 영역 - 중앙, X가 가장 앞으로 나온 부분
    float noseY = smoothstep(-0.06, 0.0, vPosition.y) * smoothstep(0.10, 0.04, vPosition.y);
    float noseX = smoothstep(0.10, 0.16, vPosition.x); // 가장 앞으로 튀어나온 부분
    float noseZ = smoothstep(-0.03, 0.0, vPosition.z) * smoothstep(0.03, 0.0, vPosition.z); // 중앙
    float noseMask = noseY * noseX * noseZ;

    // ========================================
    // 기본 라이팅 (Lighting with Skin Properties)
    // ========================================
    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5)); // 조명 방향
    vec3 lightDir2 = normalize(vec3(-0.5, 0.3, 0.8)); // 보조 조명
    
    // Diffuse: 요철이 적용된 Normal 사용
    float diffuse = max(dot(bumpyNormal, lightDir), 0.0);
    float diffuse2 = max(dot(bumpyNormal, lightDir2), 0.0) * 0.3;

    // Specular (Roughness Variation): 
    // T존(이마, 코)은 약간 더 번들거리고(Low Roughness), 볼은 매트하게(High Roughness)
    float tZone = noseMask + browMask * 0.5;
    float roughness = 0.6 - (tZone * 0.3); // 0.6(기본) ~ 0.3(T존)
    
    // Blinn-Phong Specular
    vec3 viewDir = normalize(-vPosition);
    vec3 halfDir = normalize(lightDir + viewDir);
    float specAngle = max(dot(bumpyNormal, halfDir), 0.0);
    float spec = pow(specAngle, 1.0 / (roughness * 0.1)) * (1.0 - roughness); // 거칠기에 따른 광택

    // Subsurface Scattering (SSS) 느낌 흉내
    // 빛이 투과되는 느낌: 법선의 반대 방향과 라이트의 내적
    float sss = pow(max(dot(-bumpyNormal, lightDir), 0.0), 2.0) * 0.4;

    // 림 라이트 (Rim Light)
    float rim = pow(1.0 - max(dot(viewDir, bumpyNormal), 0.0), 3.0) * 0.4;

    // 처짐/리프팅 영역 마스크 (좌표계: X=앞뒤, Z=좌우)
    float cheekArea = smoothstep(-0.25, 0.05, vPosition.y) * smoothstep(0.20, -0.05, vPosition.y);
    float sideArea = smoothstep(0.03, 0.15, abs(vPosition.z)); // Z가 좌우
    float frontArea = smoothstep(-0.05, 0.12, vPosition.x); // X가 앞뒤
    float affectedArea = cheekArea * sideArea * frontArea;

    // 팔자주름 영역 그림자 (깊은 주름 표현)
    float nasolabialShadowY = smoothstep(-0.12, 0.0, vPosition.y) * smoothstep(0.08, -0.04, vPosition.y);
    float nasolabialShadowZ = smoothstep(0.03, 0.05, abs(vPosition.z)) * smoothstep(0.09, 0.06, abs(vPosition.z));
    float nasolabialShadowX = smoothstep(0.06, 0.12, vPosition.x);
    float nasolabialShadowMask = nasolabialShadowY * nasolabialShadowZ * nasolabialShadowX;

    // 턱선 처짐 영역 그림자
    float jawShadowY = smoothstep(-0.30, -0.15, vPosition.y) * smoothstep(-0.05, -0.20, vPosition.y);
    float jawShadowZ = smoothstep(0.0, 0.12, abs(vPosition.z));
    float jawShadowMask = jawShadowY * jawShadowZ;

    // 처진 상태일 때 그림자 효과
    float sagAmount = max(-uLiftIntensity, 0.0);
    float sagShadow = affectedArea * sagAmount * 0.20;
    float nasolabialShadow = nasolabialShadowMask * sagAmount * 0.35; // 팔자주름 그림자 강조
    float jawShadow = jawShadowMask * sagAmount * 0.25; // 턱 그림자

    // 리프팅 상태일 때 하이라이트 효과
    float liftAmount = max(uLiftIntensity, 0.0);
    float liftHighlight = affectedArea * liftAmount * 0.08;

    // 기본 색상 계산 (피부톤 + 혈색 노이즈)
    vec3 baseColor = uSkinColor + vec3(redness * 0.05, 0.0, 0.0); // 미세한 붉은기 추가

    // 입술/블러셔 메이크업 적용
    baseColor = mix(baseColor, vec3(0.8, 0.3, 0.3), lipMask * 0.5); // 입술
    baseColor = mix(baseColor, vec3(0.9, 0.5, 0.5), blushMask * 0.2); // 블러셔

    // 처진 부분은 약간 어둡고 붉은 톤
    float totalSagShadow = sagShadow + nasolabialShadow + jawShadow;
    baseColor = mix(baseColor, uSagColor, totalSagShadow);

    // 팔자주름 영역은 더 어둡게 (주름 깊이 표현)
    baseColor = mix(baseColor, uSagColor * 0.7, nasolabialShadow * 0.5);

    // 라이팅 적용
    // ========================================
    vec3 litColor = baseColor * (0.35 + diffuse * 0.55 + diffuse2 + sss);

    // 스페큘러 (입술, 코에 더 강하게)
    float lipSpec = spec * lipMask * 2.0;
    float noseSpec = spec * noseMask * 1.5;
    litColor += vec3(1.0, 0.98, 0.95) * (spec * 0.2 + lipSpec + noseSpec);

    // 림 라이트
    litColor += uHighlightColor * rim * 0.4;

    // 리프팅 하이라이트
    litColor += uHighlightColor * liftHighlight;

    // 눈에 약간의 반사광
    litColor += vec3(1.0) * eyeMask * spec * 0.5;

    gl_FragColor = vec4(litColor, 1.0);
  }
`;

export function LiftingFace({ liftLevel }: LiftingFaceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const currentIntensity = useRef(-1); // 시작: 처진 상태

  // 3D 헤드 모델 로드
  const { scene } = useGLTF(MODEL_PATH);

  // 모델에서 모든 geometry 추출하고 병합
  const mergedGeometry = useMemo(() => {
    const geos: THREE.BufferGeometry[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        console.log("Found mesh:", child.name);
        // geometry 복제하고 월드 매트릭스 적용
        const geo = child.geometry.clone();
        child.updateMatrixWorld();
        geo.applyMatrix4(child.matrixWorld);
        geos.push(geo);
      }
    });
    console.log("Total meshes found:", geos.length);

    if (geos.length === 0) return null;
    if (geos.length === 1) return geos[0];

    // 모든 geometry의 속성을 통일 (uv, normal 등)
    // 어떤 속성이 있는지 확인
    const hasUv = geos.some(g => g.attributes.uv);
    const hasNormal = geos.some(g => g.attributes.normal);

    geos.forEach((geo, index) => {
      // UV가 없는 geometry에 빈 UV 추가
      if (hasUv && !geo.attributes.uv) {
        const posCount = geo.attributes.position.count;
        const uvArray = new Float32Array(posCount * 2);
        geo.setAttribute('uv', new THREE.BufferAttribute(uvArray, 2));
        console.log(`Added empty UV to geometry ${index}`);
      }
      // UV가 있는데 다른 것들은 없으면 제거
      if (!hasUv && geo.attributes.uv) {
        geo.deleteAttribute('uv');
      }

      // Normal이 없는 geometry에 계산해서 추가
      if (hasNormal && !geo.attributes.normal) {
        geo.computeVertexNormals();
        console.log(`Computed normals for geometry ${index}`);
      }
    });

    // 모든 geometry 병합
    const merged = mergeGeometries(geos, false);
    if (!merged) return null;

    // *** 중요: 지오메트리 중심점을 (0,0,0)으로 강제 이동 ***
    merged.center();

    console.log("Merged geometry created and centered");
    return merged;
  }, [scene]);

  // Shader Material 생성
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: liftingVertexShader,
        fragmentShader: liftingFragmentShader,
        uniforms: {
          uLiftIntensity: { value: -1 }, // 시작: 처진 상태
          uTime: { value: 0 },
          uSkinColor: { value: new THREE.Color("#ffe4c4") }, // 밝은 살구색
          uHighlightColor: { value: new THREE.Color("#87CEEB") }, // 하늘색 하이라이트 (리프팅 효과)
          uSagColor: { value: new THREE.Color("#d4a89a") }, // 처진 부분 색상 (약간 어둡고 붉은)
        },
        side: THREE.FrontSide,
      }),
    []
  );

  // 단계별 intensity 값
  // Level 0: 처진 상태 (-1)
  // Level 1: 기본 상태 (0) - 처짐 해소
  // Level 2: 리프팅 1단계 (1.5)
  // Level 3: 리프팅 극대화 (3.0)
  const targetIntensity = useMemo(() => {
    switch (liftLevel) {
      case 0:
        return -1.0; // 처진 상태
      case 1:
        return 0.5; // 자연스러운 개선
      case 2:
        return 1.5; // 또렷한 리프팅
      case 3:
        return 3.0; // 극대화 리프팅
      default:
        return -1.0;
    }
  }, [liftLevel]);

  // 부드러운 전환 애니메이션
  useFrame((state, delta) => {
    if (materialRef.current) {
      // 현재 intensity를 target으로 부드럽게 이동
      const diff = targetIntensity - currentIntensity.current;
      currentIntensity.current += diff * delta * 2; // 2는 전환 속도

      materialRef.current.uniforms.uLiftIntensity.value =
        currentIntensity.current;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  // 로드 여부 확인
  if (!mergedGeometry) {
    console.log("No geometry found");
    return null;
  }

  return (
    <group
      position={[0, 0, 0]}
      scale={2.0} // 조금 더 크게
      rotation={[0, 0, 0]} // 회전값 초기화 (모델 본래 방향 확인)
    >
      <mesh ref={meshRef} geometry={mergedGeometry}>
        <primitive object={shaderMaterial} ref={materialRef} attach="material" />
      </mesh>
    </group>
  );
}

// Preload
useGLTF.preload(MODEL_PATH);
