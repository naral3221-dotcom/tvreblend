import { footerContent } from "@/constants";

export function Footer() {
  const { hospital, address, phone } = footerContent;

  return (
    <footer className="bg-primary text-white/60 py-8 border-t border-white/10">
      <div className="container-custom">
        <div className="text-center text-sm space-y-2">
          <p className="text-white/80 font-medium">{hospital}</p>
          <p>{address}</p>
          <p>대표전화: {phone}</p>
          <p className="pt-4 text-white/40">
            © {new Date().getFullYear()} {hospital}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
