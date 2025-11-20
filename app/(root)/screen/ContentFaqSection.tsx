import ContentFaqCard from '@/components/shared/ContentFaqCard';

export default function ContentFaqSection({ data }: { data: any }) {

  if (!data) return null


  const content = data?.content?.content || '';
  const faqs = data?.faqs || [];

  return (
    <div className="w-full my-5 md:my-16 px-5 md:px-0">
      <ContentFaqCard content={content} faqs={faqs} />
    </div>
  );
}
