"use client"

import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/fade-in"

interface TestimonialCardProps {
  quote: string
  author: string
  title: string
  image: string
  delay?: number
}

export function TestimonialCard({ quote, author, title, image, delay = 0 }: TestimonialCardProps) {
  return (
    <FadeIn delay={delay}>
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-20 w-20 rounded-full overflow-hidden mb-6">
              <Image
                src={image}
                alt={author}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-muted-foreground mb-4 italic">&quot;{quote}&quot;</p>
            <div>
              <h3 className="font-bold">{author}</h3>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

