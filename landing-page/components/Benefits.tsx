"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { benefitsSectionContent } from "@/constants";

export function Benefits() {
  const { headline, benefits } = benefitsSectionContent;

  return (
    <section id="benefits" className="section-padding bg-background">
      <div className="container-custom">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {headline.text} <span className="text-accent">{headline.highlight}</span>인가요?
          </h2>
        </motion.div>

        {/* 혜택 그리드 */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
