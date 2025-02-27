"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/fade-in"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  category: string
  location: string
  delay?: number
}

export function ProjectCard({ title, description, image, category, location, delay = 0 }: ProjectCardProps) {
  return (
    <FadeIn delay={delay}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative h-[200px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground py-1 px-3 rounded-md text-sm font-medium">
            {category}
          </div>
        </div>
        <CardContent className="pt-5">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground mt-2">{description}</p>
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  )
}


