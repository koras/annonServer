module.exports = (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
};
