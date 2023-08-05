type InputCustomProps = {
  size?: string;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
