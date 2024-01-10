import { inferRouterOutputs } from '@trpc/server'
import { AppRouter } from '~/server/api/root'

type RouterOutput = inferRouterOutputs<AppRouter>

type Messages = RouterOutput["file"]['getFileMessages']['messages']

type OmitText = Omit<Messages[number], 'text'>

type ExtendedText = {
  text: string | JSX.Element
}

export type ExtendedMessage = OmitText & ExtendedText