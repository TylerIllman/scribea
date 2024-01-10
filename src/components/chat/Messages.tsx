import { Loader2, MessageSquare } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { INFINITE_QUERY_LIMIT } from "~/config/infinit-query";
import { api } from "~/trpc/react";
import Message from "./Message";
import { ChatContext } from "./ChatContext";
import { useContext, useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";

interface MessagesProps {
  fileId: string;
}

const Messages = ({ fileId }: MessagesProps) => {
  const { isLoading: isAiThinking } = useContext(ChatContext);

  const { data, isLoading, fetchNextPage } =
    api.file.getFileMessages.useInfiniteQuery(
      {
        fileId,
        limit: INFINITE_QUERY_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
      },
    );

  const messages = data?.pages.flatMap((page) => page.messages);

  const loadingMessage = {
    createdAt: new Date(), //POTENTIAL BUG: .toISOString() in tutorial he set it as an ISO string. I removed due to type error
    id: "loading-message",
    isUserMessage: false,
    text: (
      <span className="flex h-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    ),
  };

  const combindedMessages = [
    ...(isAiThinking ? [loadingMessage] : []),
    ...(messages ?? []),
  ];

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col-reverse gap-4 overflow-y-auto border-zinc-200 p-3">
      {combindedMessages && combindedMessages.length > 0 ? (
        combindedMessages.map((message, i) => {
          const isNextMessageSamePerson =
            combindedMessages[i - 1]?.isUserMessage ===
            combindedMessages[i]?.isUserMessage;
          if (i === combindedMessages.length - 1) {
            return (
              <Message
                ref={ref}
                key={message.id}
                isNextMessageSamePerson={isNextMessageSamePerson}
                message={message}
              />
            );
          } else {
            return (
              <Message
                key={message.id}
                isNextMessageSamePerson={isNextMessageSamePerson}
                message={message}
              />
            );
          }
        })
      ) : isLoading ? (
        <div className="flex-cal flex w-full gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-500" />
          <h3 className="text-xl font-semibold">You&apos;re all set!</h3>
          <p className="txt-sm text-zinc-500">
            Ask your first question to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
