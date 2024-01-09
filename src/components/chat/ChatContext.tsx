import { useMutation } from "@tanstack/react-query";
import { createContext, useRef, useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { INFINITE_QUERY_LIMIT } from "~/config/infinit-query";
import { api } from "~/trpc/react";

type StreamResponse = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

interface Props {
  fileId: string;
  children: React.ReactNode;
}

export const ChatContextProvider = ({ fileId, children }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const utils = api.useUtils();

  const { toast } = useToast();

  const backupMessage = useRef("");

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      console.log("IN MUTATION WITH MESSAGE: ", message);
      const response = await fetch("/api/sendmessage", {
        method: "POST",
        body: JSON.stringify({
          fileId: fileId,
          message: message,
        }),
      });

      if (!response.ok) {
        console.log("THIS IS THE RESPONSE: ", response);
        throw new Error("Failed to send message");
      }

      return response.body;
    },

    onMutate: async ({ message }) => {
      backupMessage.current = message;
      setMessage("");

      await utils.file.getFileMessages.cancel();

      const previousMessages = utils.file.getFileMessages.getInfiniteData();

      utils.file.getFileMessages.setInfiniteData(
        { fileId, limit: INFINITE_QUERY_LIMIT },
        (old) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            };
          }
          let newPages = [...old.pages];

          let latestPage = newPages[0]!;

          latestPage.messages = [
            {
              createdAt: new Date(), // I DIDNT CONVER TO ISO STRING
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
            ...latestPage.messages,
          ];

          newPages[0] = latestPage;

          return {
            ...old,
            pages: newPages,
          };
        },
      );

      setIsLoading(true);

      return {
        previousMessages:
          previousMessages?.pages.flatMap((page) => page.messages) ?? [],
      };
    },

    onError: (_, __, context) => {
      setMessage(backupMessage.current);
      utils.file.getFileMessages.setData(
        { fileId },
        //  POTENTIAL BUG: I HARD CODED THE CURSOR THIS IS A MISTAKE I COULDN'T FIGURE OUT
        { messages: context?.previousMessages ?? [], nextCursor: undefined },
      );
    },

    onSettled: async () => {
      setIsLoading(false);
      await utils.file.getFileMessages.invalidate({ fileId });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const addMessage = () => sendMessage({ message });

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
