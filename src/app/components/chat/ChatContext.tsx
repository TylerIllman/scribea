import { useMutation } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { useToast } from "~/components/ui/use-toast";

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

  const { toast } = useToast();

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: String }) => {
      console.log("IN MUTATION WITH MESSAGE: ", message);
      const response = await fetch("/api/sendmessage", {
        method: "POST",
        body: JSON.stringify({
          fileId: fileId,
          message: message,
        }),
      });
      // const response = await fetch("/api/message", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     fileId: fileId,
      //     message: message,
      //   }),
      // });

      if (!response.ok) {
        console.log("THIS IS THE RESPONSE: ", response);
        throw new Error("Failed to send message");
      }

      return response.body;
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
