'use client'
import React, { useEffect, useState } from 'react'
import { Video, secondaryColor } from '../globals';
import { Badge, Card, Image as MantineImage, Group, Text, Loader, Center } from '@mantine/core';

export interface VideoCardProps {
    video: Video;
}

const VideoCard = ({video}: VideoCardProps) => {
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
  <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {loading ? 
        <Center>
          <Loader c={secondaryColor}/>
        </Center>
        : 
        <MantineImage
          src={thumbnail}
          height={300}
          onClick={() => window.open(video.url, '_blank')}
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
        {video.length} | {video.date}
      </Text>
    </Card>
  )
}

export default VideoCard