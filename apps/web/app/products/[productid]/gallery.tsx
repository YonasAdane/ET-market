'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const [currentIndex,setCurrentIndex]=useState(0);
  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <>
      <div className=" relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
            {images[currentIndex] && (
            <Image
                className="h-full w-full object-contain"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                alt={images[currentIndex]?.altText as string}
                src={images[currentIndex]?.src as string}
                priority={true}
            />
            )}

            {images.length > 1 ? (
            <div className="absolute bottom-[15%] flex w-full justify-center">
                <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
                <div
                    aria-label="Previous product image"
                    className={buttonClassName}
                    onClick={()=>{setCurrentIndex(currentIndex===0 ? images.length-1 : currentIndex-1)}}
                >
                    <ChevronLeft className="h-5" />
                </div>
                <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                <div
                    aria-label="Next product image"
                    className={buttonClassName}
                    onClick={()=>{setCurrentIndex(currentIndex===images.length-1 ? 0 : currentIndex+1)}}

                >
                    <ChevronRight className="h-5" />
                </div>
                </div>
            </div>
            ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="my-5 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === currentIndex;
            return (
              <li key={image.src} className="h-20 w-20">
                <div
                  aria-label="Enlarge product image"
                  onClick={()=>setCurrentIndex(index)}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}

export function GridTileImage({
  isInteractive = true,
  active,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={cn(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {props.src ? (
        <Image
          className={cn('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
     
    </div>
  );
}