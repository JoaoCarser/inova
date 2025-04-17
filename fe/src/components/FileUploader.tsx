"use client";

import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { ProjectFile } from "@/app/entities/Project";
import { useMutation } from "@tanstack/react-query";
import { filesService } from "@/app/services/filesService";

interface FileUploaderProps {
  filesToUpload: { File: File }[];
  setFilesToUpload: React.Dispatch<
    React.SetStateAction<
      {
        File: File;
      }[]
    >
  >;
  uploadedFiles?: ProjectFile[];
  setUploadedFiles?: React.Dispatch<React.SetStateAction<ProjectFile[]>>;
  projectId?: string;
}

enum FileTypes {
  Image = "image",
  Pdf = "pdf",
  Audio = "audio",
  Video = "video",
  Other = "other",
}

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

const AudioColor = {
  bgColor: "bg-yellow-400",
  fillColor: "fill-yellow-400",
};

const VideoColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-green-400",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

export default function FileUploader({
  filesToUpload,
  setFilesToUpload,
  setUploadedFiles,
  uploadedFiles,
  projectId,
}: FileUploaderProps) {
  console.log("filesToUpload in component", filesToUpload);
  console.log("uploadedFiles in component", uploadedFiles);

  const getFileIconAndColor = (file: File) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <FileImage size={40} className={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <File size={40} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
        color: AudioColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: <Video size={40} className={VideoColor.fillColor} />,
        color: VideoColor.bgColor,
      };
    }

    return {
      icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
      color: OtherColor.bgColor,
    };
  };

  const { isPending: isLoadingDeleteFile, mutateAsync: mutateDelete } = useMutation({
    mutationFn: filesService.remove,
    onSuccess: (_data, variables) => {
      if (setUploadedFiles) {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== variables.fileId));
      }
    },
  });

  const deleteUploadedFile = async (fileId: string) => {
    alert(`File ${projectId} deleted!`);
    if (!projectId) return;
    await mutateDelete({ fileId, projectId: projectId });
  };

  const removeFile = (file: File) => {
    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.filter((item) => item.File !== file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFilesToUpload((prevUploadProgress) => {
      return [
        ...prevUploadProgress,
        ...acceptedFiles.map((file) => {
          return {
            progress: 0,
            File: file,
            source: null,
          };
        }),
      ];
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="w-full">
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-2  border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
        >
          <div className="text-center">Escolher Arquivos</div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>

      {uploadedFiles && uploadedFiles.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Arquivos vinculados ao projeto
            </p>
            <div className="space-y-2 pr-3">
              {uploadedFiles.map((file) => {
                return (
                  <div
                    key={file.id}
                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                  >
                    <a
                      className="flex items-center flex-1 p-2 cursor-pointer"
                      href={file.path.replace("#", "%23")}
                      target="_blank"
                    >
                      <div className="text-white">
                        {<FolderArchive size={40} className={OtherColor.fillColor} />}
                      </div>

                      <div className="w-full ml-2 space-y-1">
                        <div className="text-sm flex justify-between">
                          <p className="text-muted-foreground ">
                            {file.path.slice(0, 25)}
                          </p>
                        </div>
                      </div>
                    </a>
                    <button
                      onClick={() => {
                        deleteUploadedFile(file.id);
                      }}
                      disabled={isLoadingDeleteFile}
                      type="button"
                      className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Arquivos selecionados para enviar
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileUploadProgress) => {
                return (
                  <div
                    key={fileUploadProgress.File.lastModified}
                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                  >
                    <div className="flex items-center flex-1 p-2">
                      <div className="text-white">
                        {getFileIconAndColor(fileUploadProgress.File).icon}
                      </div>

                      <div className="w-full ml-2 space-y-1">
                        <div className="text-sm flex justify-between">
                          <p className="text-muted-foreground ">
                            {fileUploadProgress.File.name.slice(0, 25)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        removeFile(fileUploadProgress.File);
                      }}
                      className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
