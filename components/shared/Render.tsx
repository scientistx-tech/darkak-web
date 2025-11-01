import Image from 'next/image';
import './content.css';

type EditorJsBlock = {
  id?: string;
  type: string;
  data: any;
};

type EditorJsRendererProps = {
  data: {
    time: number;
    blocks: EditorJsBlock[];
    version: string;
  };
};

const EditorJsRenderer: React.FC<EditorJsRendererProps> = ({ data }) => {
  // useEffect(() => {
  //   data?.blocks.map((d) => {
  //     console.log(d)
  //   })
  // }, [])
  if (!data || !data.blocks || !Array.isArray(data.blocks)) {
    return <p>No content to display</p>;
  }

  const renderBlock = (block: EditorJsBlock, index: number) => {
    const { type, data } = block;
    console.log(block);

    switch (type) {
      case 'header':
        const Tag = `h${data.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        return (
          <Tag key={index} className="my-2 font-bold text-gray-800">
            {data.text}
          </Tag>
        );

      case 'paragraph':
        return (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: data.text }}
            className="rendered-html mb-2 text-gray-700"
          ></p>
        );

      case 'image':
        return (
          <div key={index} className="my-4 text-center">
            <Image
              src={data.file?.url}
              alt={data.caption || 'Image'}
              className="mx-auto w-full rounded"
            />
            {data.caption && <p className="text-sm text-gray-500">{data.caption}</p>}
          </div>
        );

      case 'linkTool':
        return (
          <a
            key={index}
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="my-2 block text-blue-600 underline"
          >
            {data.meta?.title || data.link}
          </a>
        );

      case 'raw':
        return (
          <div
            key={index}
            className="prose prose rendered-html-sm md:prose-base my-4 max-w-none"
            dangerouslySetInnerHTML={{ __html: data.html }}
          />
        );

      case 'embed':
        return (
          <div key={index} className="my-4">
            <iframe
              src={data.embed}
              width={data.width || '100%'}
              height={data.height || '320'}
              title="Embedded content"
              frameBorder="0"
              allowFullScreen
              className="w-full max-w-full rounded"
            ></iframe>
            {data.caption && <p className="text-sm text-gray-500">{data.caption}</p>}
          </div>
        );

      case 'table':
        return (
          <div key={index} className="my-4 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <tbody>
                {data.content.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <td key={cellIndex} className="border px-4 py-2 text-sm text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'list':
        return data.style === 'unordered' ? (
          <ul key={index} className="my-2 list-inside list-disc text-gray-700">
            {data.items.map((item: { content: string }, i: number) => (
              <li key={i}>{item.content}</li>
            ))}
          </ul>
        ) : (
          <ol key={index} className="my-2 list-inside list-decimal text-gray-700">
            {data.items.map((item: { content: string }, i: number) => (
              <li key={i}>{item.content}</li>
            ))}
          </ol>
        );

      default:
        return (
          <p key={index} className="text-red-500">
            Unsupported block type: {type}
          </p>
        );
    }
  };

  return <div className="editorjs-renderer">{data?.blocks?.map(renderBlock)}</div>;
};

export default EditorJsRenderer;
