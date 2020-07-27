import Swal from "sweetalert2";

const useToast = ({
  toast = true,
  position = "center",
  timer = 3000,
  timerProgressBar = true,
  showConfirmButton = false,
}) => {
  const toastConfig = {
    toast,
    position,
    showConfirmButton,
    timer,
    timerProgressBar,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  };

  const Toast = Swal.mixin(toastConfig);

  return Toast;
};

export default useToast;
