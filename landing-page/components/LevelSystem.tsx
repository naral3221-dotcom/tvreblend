"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { levelSystemContent } from "@/constants";

export function LevelSystem() {
  const { headline, subheadline, question, levels } = levelSystemContent;

  return (
    <section id="level-system" className="section-padding bg-muted">
      <div className="container-custom">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {headline.text} <span className="text-accent">{headline.highlight}</span>은?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {subheadline}
          </p>
          <p className="text-foreground font-medium mt-4">
            {question.map((line, i) => (
              <span key={i}>
                {line}
                {i < question.length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>

        {/* LEVEL 카드 그리드 */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {levels.map((item, index) => (
            <motion.div
              key={item.level}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="h-full"
            >
              <Card
                className={`h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  item.popular
                    ? "border-2 border-accent shadow-lg gold-glow"
                    : "border border-border/50 hover:border-accent/30"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  {item.popular && (
                    <Badge className="w-fit mx-auto mb-3 bg-accent text-primary font-semibold">
                      MOST POPULAR
                    </Badge>
                  )}
                  <div
                    className={`text-sm font-medium mb-2 ${
                      item.popular ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    LEVEL {item.level}
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {item.title}
                  </CardTitle>
                  <p
                    className={`font-semibold ${
                      item.popular ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {item.tagline}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* 특징 리스트 */}
                  <ul className="space-y-3 mb-6">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 추천 대상 */}
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">추천 대상</p>
                    <p className="text-sm text-foreground">{item.target}</p>
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
