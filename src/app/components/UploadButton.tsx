"use client";

import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File } from "lucide-react";
import { Progress } from "~/components/ui/progress";
import { useUploadThing } from "~/lib/uploadthing";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const UploadDropzone = () => {
  const [isUploading, setIsUploading] = useState<boolean>(true);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();
  const { toast } = useToast();
  const { startUpload } = useUploadThing("PdfUploader");

  const { mutate: startPolling } = api.file.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        const progressInterval = startSimulatedProgress();

        const res = await startUpload(acceptedFile);

        if (!res) {
          return toast({
            title: "Something went wrong",
            description: "Please try again later.",
            variant: "destructive",
          });
        }

        const [fileResponse] = res;

        const key = fileResponse?.key;

        if (!key) {
          return toast({
            title: "Something went wrong",
            description: "Please try again later.",
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        startPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="m-4 h-64 rounded-lg border border-dashed border-gray-300"
        >
          <div className="w-ful flex h-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-zinc-500">PDF (up to 4MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="outlines-zinc-200 flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px]">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <File className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                </div>
              ) : null}

              <input
                {...getInputProps}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
