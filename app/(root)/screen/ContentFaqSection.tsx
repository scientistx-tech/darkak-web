import ContentFaqCard from '@/components/shared/ContentFaqCard';

export default function ContentFaqSection({ data }: { data: any }) {

  if (!data) return null


  const content = data?.content?.content || '';
  const faqs = data?.faqs || [];

  return (
    <div className="w-full mt-10">
      <ContentFaqCard content={content} faqs={faqs} />
    </div>
  );
}
