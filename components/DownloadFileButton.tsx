"use client";

type DownloadFileButtonProps = {
  fileName: string;
  content: string;
};

function safeDownloadName(fileName: string) {
  return fileName.replaceAll("/", "_");
}

export function DownloadFileButton({
  fileName,
  content,
}: DownloadFileButtonProps) {
  function handleDownload() {
    const blob = new Blob([content], {
      type: "text/markdown;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = safeDownloadName(fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="premium-button-secondary rounded-full border px-3 py-1.5 text-xs font-medium"
    >
      Download
    </button>
  );
}
