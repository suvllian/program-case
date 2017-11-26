module.exports = {
	insert: 'INSERT INTO stock (`code`, `name`, `amount`, `proportion`, `dateT`) VALUES ?',
	query: 'SELECT * FROM stock WHERE code = ? ORDER BY dateT DESC',
	queryAll: 'SELECT t1.id, t1.code, t1.name, t2.amount-t1.amount as amount FROM stock t1, stock t2 WHERE t1.code = t2.code AND t1.dateT = ? AND t2.dateT = ?',
	queryAllWithCode: 'SELECT t1.id, t1.code, t1.name, t2.amount-t1.amount as amount FROM stock t1, stock t2 WHERE t1.code = t2.code AND t1.dateT = ? AND t2.dateT = ? AND (t1.code LIKE ? OR t1.name LIKE ?)'
}

