import { MasonryGallery } from '@/components/ui/MasonryGallery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { usePageTitle } from '@/hooks/usePageTitle';
import { galleryImages } from '@/lib/assets';

const Gallery = () => {
  usePageTitle('Gallery | LS Tours');
  return (
    <div className="py-12">
      <div className="container">
        <SectionHeader title="Gallery" subtitle="Glimpses of Sri Lanka's breathtaking beauty" />
        <MasonryGallery images={galleryImages} />
      </div>
    </div>
  );
};

export default Gallery;
