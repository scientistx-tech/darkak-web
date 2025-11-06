import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>{children}</div>
    )
}
