import { Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/src/lib/prisma'
import { ScheduleForm } from './ScheduleForm'
import { NextSeo } from 'next-seo'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | Ignite Call`} />

      <Container>
        <UserHeader>
          <img src={user.avatarUrl} />
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  /*
    OBRIGATÓRIO em caso de páginas estáticas (getStaticProps) que utilizam parâmetros,
    é necessário informar os parâmetros iniciais durante a geração da build do servidor Next.js.
    Neste caso, definindo um array vazio (paths) significa que nenhuma página estática é gerada inicialmente.
    O motivo dessa configuração é permitir que a página seja gerada dinamicamente quando os parâmetros
    são adicionados, ao invés de criar todas as páginas possíveis durante a build.
  */
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
      },
    }, // será passado para o componente da página como props
    revalidate: 60 * 60 * 24, // 1 dia
  }
}
