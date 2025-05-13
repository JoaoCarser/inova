import { File, FileArchive, FileText, ImageIcon } from "lucide-react";

export const FileIcon = ({ filePath }: { filePath: string }) => {
  if (filePath.includes("pdf")) return <FileText className="h-5 w-5 text-red-500" />;
  if (filePath.includes("doc")) return <FileText className="h-5 w-5 text-blue-500" />;
  if (filePath.includes("xls")) return <FileText className="h-5 w-5 text-green-500" />;
  if (filePath.includes("ppt")) return <FileText className="h-5 w-5 text-orange-500" />;
  if (filePath.includes("image") || filePath.includes("jpg") || filePath.includes("png"))
    return <ImageIcon className="h-5 w-5 text-purple-500" />;
  if (filePath.includes("zip") || filePath.includes("rar"))
    return <FileArchive className="h-5 w-5 text-gray-500" />;
  return <File className="h-5 w-5 text-gray-500" />;
};
