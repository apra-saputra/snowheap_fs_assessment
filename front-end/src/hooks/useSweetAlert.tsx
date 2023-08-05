import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

type UseSweetAlert = () => {
  toast: (message: string, icon: SweetAlertIcon) => void;
  confirmBox: (title: string) => Promise<SweetAlertResult<any>>;
};

const useSweetAlert: UseSweetAlert = () => {
  const toast = (message: string, icon: SweetAlertIcon) => {
    let color: string;

    switch (icon) {
      case "error":
        color = "red";
        break;
      default:
        color = "var(--accent)";
        break;
    }

    Swal.fire({
      icon: icon,
      text: message,
      toast: true,
      color: color,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      width: "300px",
      showClass: {
        popup: "swal2-show",
        backdrop: "swal2-noanimation",
      },
      hideClass: {
        popup: "",
        backdrop: "",
      },
      background: "var(--secondary)",
      iconColor: color,
    });
  };

  const confirmBox = async (
    title: string,
  ) => {
    return await Swal.fire({
      title: title,
      showCancelButton: true,
      background: "var(--secondary)",
      confirmButtonText: "Ok",
      confirmButtonColor: "var(--accent)",
      denyButtonText: `Back`,
    });
  };

  return { toast, confirmBox };
};

export default useSweetAlert;
