import { Box, styled, Text } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },

  img: {
    width: '$16',
    height: '$16',
    borderRadius: '100%',
    objectFit: 'cover',
  },
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
