import { useState } from 'preact/hooks';

import { useActions } from '@src/components/hooks/store';
import { PopupType } from '@src/modules/layerPopup';

import { GridGuideCreationInfo } from '@t/components/daygrid/gridWithMouse';

export type CreationGuide = GridGuideCreationInfo | null;

export function useCreationGuide(useCreationPopup = false) {
  const [creationGuide, setCreationGuide] = useState<CreationGuide>(null);
  const [popupFlag, setPopupFlag] = useState(false);

  const { show, hide } = useActions('layerPopup');

  const onOpenCreationPopup = (guide: GridGuideCreationInfo) => {
    if (useCreationPopup) {
      const { start, end } = guide;

      // @TODO: popupRect 계산 필요
      show({
        type: PopupType.creation,
        param: {
          start,
          end,
          isAllDay: true,
          popupRect: {
            width: 474,
            height: 272,
            left: 102.695,
            top: 257,
          },
          close: () => {
            onGuideCancel();
            setPopupFlag(false);
          },
        },
      });

      if (!popupFlag) {
        setPopupFlag(true);
      }
    }
  };

  const onGuideStart = (guide: CreationGuide) => setCreationGuide(guide);
  const onGuideEnd = (guide: CreationGuide) => {
    setCreationGuide(guide);

    if (guide) {
      onOpenCreationPopup(guide);
    } else if (!guide && popupFlag) {
      hide();
    }
  };
  const onGuideChange = (guide: GridGuideCreationInfo) => setCreationGuide(guide);
  const onGuideCancel = () => setCreationGuide(null);

  return {
    creationGuide,
    onGuideStart,
    onGuideEnd,
    onGuideChange,
    onGuideCancel,
  };
}
