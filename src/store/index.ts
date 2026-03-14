import { useUserStore } from "@/store/auth/userStore";
import { useFormStore } from "@/store/forms/formStore";
import { useEditView } from "@/store/forms/data/useEditView";
import { useLoginView } from "@/store/forms/data/useLoginView";
import { useRegisterView } from "@/store/forms/data/useRegisterView";
import { useMapView } from "@/store/forms/data/useMapView";
import { useDisplayStore } from "@/store/display/displayStore";

export {
  useUserStore,
  useFormStore,
  useDisplayStore,
  useEditView,
  useLoginView,
  useRegisterView,
  useMapView
};