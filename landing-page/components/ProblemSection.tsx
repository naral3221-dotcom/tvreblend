"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { problemSectionContent } from "@/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

export function ProblemSection() {
  const { headline, subheadline, emphasis, problems } = problemSectionContent;

  return (
    <section id="problem" className="section-padding bg-muted">
      <div className="container-custom">
        {/* 섹션 헤더 */}
        <motion.div
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {headline.text} <span className="text-accent">{headline.highlight}</span>할까요?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {subheadline.map((line, i) => (
              <span key={i}>
                {line}
                {i < subheadline.length - 1 && <br />}
              </span>
            ))}
            <br />
            <span className="font-medium text-foreground">
              {emphasis}
            </span>
          </p>
        </motion.div>

        {/* 문제점 카드 */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                    <problem.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
