"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { trustSectionContent } from "@/constants";

export function TrustSection() {
  const { headline, hospital, hours } = trustSectionContent;

  return (
    <section id="trust" className="section-padding bg-secondary/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {headline.join(" ")}
          </h2>

          <div className="space-y-4 text-foreground">
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-5 h-5 text-accent" />
              <span>{hospital.address}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              신사역 8번 출구 앞
            </p>

            <div className="flex items-center justify-center gap-3 pt-4">
              <Phone className="w-5 h-5 text-accent" />
              <a
                href={`tel:${hospital.phone}`}
                className="text-xl font-semibold hover:text-accent transition-colors"
              >
                {hospital.phone}
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <Clock className="w-5 h-5 text-accent" />
              <div className="text-sm">
                <p>{hours.weekday}</p>
                <p>{hours.saturday}</p>
                <p className="text-muted-foreground">{hours.sunday}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
