export const getStatusText = (status: string) => {
  switch (status) {
    case 'attending':
      return 'Asistiré';
    case 'interested':
      return 'Me interesa';
    default:
      return 'Marcar interés';
  }
};
