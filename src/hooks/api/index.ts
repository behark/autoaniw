// Base API hooks
export { useApi, usePaginatedApi } from './useApi';

// Vehicle hooks
export {
  useVehicles,
  useVehicle,
  useFeaturedVehicles,
  useSimilarVehicles,
  useCreateVehicle,
  useUpdateVehicle,
  useDeleteVehicle,
  useVehicleBrands,
  useVehicleModels,
  useVehicleYears,
  useVehicleImageUpdate,
  useToggleVehicleFeatured,
  useUpdateVehicleStatus
} from './useVehicles';

// Page hooks
export {
  usePages,
  usePage,
  usePageBySlug,
  useHomepage,
  useCreatePage,
  useUpdatePage,
  useDeletePage,
  useSetAsHomepage,
  useUpdatePageStatus,
  useCheckSlugAvailability,
  useGenerateSlug
} from './usePages';

// Media hooks
export {
  useMediaFiles,
  useMediaFilesByFolder,
  useMediaFile,
  useUploadMediaFile,
  useUploadMultipleFiles,
  useUpdateMediaFile,
  useDeleteMediaFile,
  useDeleteMultipleFiles,
  useMediaFolders,
  useMediaFolder,
  useCreateFolder,
  useUpdateFolder,
  useDeleteFolder,
  useMoveFilesToFolder,
  useImageDimensions,
  useFileTypes,
  useOptimizeImage
} from './useMedia';

// Auth hooks
export {
  useAuth,
  useChangePassword,
  usePasswordReset,
  useRequireAuth
} from './useAuth';
