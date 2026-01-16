"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { solutionSectionContent } from "@/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

export function SolutionSection() {
  const { badge, headline, subheadline, features, cta } = solutionSectionContent;

  return (
    <section id="solution" className="section-padding bg-background">
      <div className="container-custom">
        {/* 섹션 헤더 */}
        <motion.div
          {...fadeInUp}
          className="text-center mb-16"
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
            {badge}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {headline.line1}
            <br />
            {headline.line2} <span className="text-accent">{headline.highlight}</span>합니다
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {subheadline.map((line, i) => (
              <span key={i}>
                {line}
                {i < subheadline.length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>

        {/* 특징 카드 */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 입체 설계 설명 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {cta.title.join(" ")}
            <br />
            <span className="text-accent">{cta.highlight}</span>
          </h3>
          <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
            {cta.description.map((line, i) => (
              <span key={i}>
                {line}
                {i < cta.description.length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
