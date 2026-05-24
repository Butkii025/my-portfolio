import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';

interface ArtImage {
  id: number;
  name: string;
}

interface CreativeCornerProps {
  onImageClick: (image: ArtImage) => void;
}

export default function CreativeCorner({ onImageClick }: CreativeCornerProps): React.JSX.Element {
  const artImages: ArtImage[] = [
    { id: 1, name: 'image.jpg' },
    { id: 2, name: 'image1.jpg' },
    { id: 3, name: 'image2.jpg' },
    { id: 4, name: 'image3.jpg' },
    { id: 5, name: 'image4.jpg' },
    { id: 6, name: 'image5.jpg' },
  ];

  return (
    <section id="creative_corner" className="py-28 px-6 border-t border-white/10 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">
            creative_corner
          </p>

          <h2 className="text-4xl md:text-3xl font-bold mb-6">
            Art_Gallery<FaPaintBrush size={20} className="inline-block ml-2 animate-bounce"/>
          </h2>
        </div>

        <p className="text-zinc-400 leading-relaxed text-lg mb-12 max-w-3xl">
          This Creative_Corner reflects the artistic side of my personality beyond technology and coding. I enjoy sketching, portrait art, charcoal drawing, poster designing, and creating meaningful visual concepts that express emotions, stories, and social messages. Art allows me to transform imagination into reality while improving my creativity, observation, and attention to detail. From detailed pencil sketches to creative designs, every artwork represents my passion for visual storytelling and self-expression.
        </p>

        {/* Gallery Images - Half Overlaid */}
        <div className="flex justify-center items-center gap-0 overflow-x-auto pb-4">
          {artImages.map((image, index) => (
            <div
              key={image.id}
              className="relative w-48 h-48 flex-shrink-0 cursor-pointer group"
              style={{
                marginLeft: index > 0 ? '-50px' : '0',
                zIndex: index,
              }}
              onClick={() => onImageClick(image)}
            >
              <img
                src={`/${image.name}`}
                alt={`Art ${image.id}`}
                className="w-40 h-40 object-cover rounded-lg border-2 border-blue-400 shadow-2xl hover:scale-110 transition duration-300"
                style={{
                  boxShadow: '0 0 30px rgba(96, 165, 250, 0.3), inset 0 0 30px rgba(96, 165, 250, 0.1)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
