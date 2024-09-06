interface AuthHeaderProps {
  title: string;
  description?: string;
}

export const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <header className="px-8 pt-6 pb-2 mb-4 flex flex-col my-2 items-start">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      {description && <p className="text-gray-600 text-center">{description}</p>}
    </header>
  );
}