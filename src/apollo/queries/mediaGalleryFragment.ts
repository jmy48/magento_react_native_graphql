import { gql } from '@apollo/client';
import { ImageSource } from 'react-native-vector-icons/Icon';

export interface MediaGalleryItemType {
  disabled: boolean;
  label: string;
  position: number;
  // url: string;
  source: ImageSource;
}

export const MEDIA_GALLERY_FRAGMENT = gql`
  fragment MediaGallery on ProductInterface {
    mediaGallery: media_gallery {
      disabled
      label
      position
      url
    }
  }
`;
