'use client'
import React, { forwardRef, useEffect, useState } from 'react'
import { Video, secondaryColor } from '../globals';
import { Badge, Card, Image as MantineImage, Group, Text, Loader, Center, Anchor } from '@mantine/core';

export interface VideoCardProps {
    video: Video;
}

const formatLength = (length: string) => {
  const [hours, minutes, seconds] = length.split(':');
  if (parseInt(hours) === 0) {
    return `${minutes}:${seconds}`
  }
  return `${hours}:${minutes}:${seconds}`

}

const VideoCard = forwardRef<HTMLDivElement, VideoCardProps>(({video}: VideoCardProps, ref) => {
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState(video.thumbnail);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = thumbnail;

      img.onload = () => {
        if (img.width === 120) {
          setThumbnail(thumbnail.replace('maxresdefault', 'mqdefault'))
        }
        setLoading(false)
      }
    }
  }, [])

  return (
  <Anchor href={video.url} target='_blank' c={secondaryColor}>
  <Card ref={ref} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {loading ? 
        <Center>
          <Loader c={secondaryColor}/>
        </Center>
        : 
        <MantineImage
          src={thumbnail}
          height={300}
          alt={`${video.title} thumbnail`}
        />}
      </Card.Section>

      <Group mt="md" mb="xs">
        <Text fw={500}>{video.title}</Text>
        <Group>
          {video.genre.map((genre, index) => 
          genre !== "N/A" && <Badge key={index} color={secondaryColor}>{genre}</Badge>
          )}
        </Group>
      </Group>

      <Text fw={500}>By {video.creator}</Text>

      <Text size="sm" c="dimmed">
        {formatLength(video.length)} | {video.date}
      </Text>
    </Card>
    </Anchor>
  )
})

export default VideoCard