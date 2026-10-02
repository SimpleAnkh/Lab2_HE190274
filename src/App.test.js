import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the movie manager, movie actions, stats, and focuses search', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /mini movie manager/i })).toBeInTheDocument();
  expect(screen.getByText('Interstellar')).toBeInTheDocument();
  expect(screen.getByText('Tổng:')).toBeInTheDocument();
  const favoriteButton = screen.getByRole('button', { name: /thêm interstellar vào danh sách yêu thích/i });
  expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
  expect(favoriteButton.querySelector('i')).toHaveClass('bi-star');
  fireEvent.click(favoriteButton);
  const unfavoriteButton = screen.getByRole('button', { name: /xóa interstellar khỏi danh sách yêu thích/i });
  expect(unfavoriteButton).toHaveAttribute('aria-pressed', 'true');
  expect(unfavoriteButton.querySelector('i')).toHaveClass('bi-star-fill');
  expect(screen.getByText('Yêu thích:').parentElement).toHaveTextContent('1');
  expect(JSON.parse(window.localStorage.getItem('cinema-favorites'))).toEqual([1]);
  fireEvent.click(unfavoriteButton);
  expect(screen.getByText('Yêu thích:').parentElement).toHaveTextContent('0');
  expect(screen.getAllByRole('button', { name: /chi tiết/i })).toHaveLength(6);
  expect(screen.getByRole('searchbox', { name: /tìm phim/i })).toHaveFocus();
});

test('updates title search while typing without case sensitivity', () => {
  render(<App />);
  const searchInput = screen.getByRole('searchbox', { name: /tìm phim/i });

  fireEvent.change(searchInput, { target: { value: 'INTERSTELLAR' } });
  expect(screen.getByRole('heading', { name: 'Interstellar' })).toBeInTheDocument();
  expect(screen.getByText('Đang hiển thị:').parentElement).toHaveTextContent('1');

  fireEvent.change(searchInput, { target: { value: 'Christopher Nolan' } });
  expect(screen.getByText('Không tìm thấy phim')).toBeInTheDocument();
  expect(screen.getByText('Đang hiển thị:').parentElement).toHaveTextContent('0');
});

test('combines the selected genre with title search', () => {
  render(<App />);
  const genreFilter = screen.getByRole('combobox', { name: /lọc theo thể loại/i });
  const searchInput = screen.getByRole('searchbox', { name: /tìm phim/i });

  expect(Array.from(genreFilter.options).map((option) => option.textContent)).toEqual([
    'Tất cả thể loại',
    'Action',
    'Animation',
    'Comedy',
    'Drama',
    'Romance',
    'Sci-Fi',
  ]);

  fireEvent.change(genreFilter, { target: { value: 'Drama' } });
  fireEvent.change(searchInput, { target: { value: 'parasite' } });
  expect(screen.getByRole('heading', { name: 'Parasite' })).toBeInTheDocument();
  expect(screen.getByText('Đang hiển thị:').parentElement).toHaveTextContent('1');

  fireEvent.change(searchInput, { target: { value: 'Interstellar' } });
  expect(screen.getByText('Không tìm thấy phim')).toBeInTheDocument();
  expect(screen.getByText('Đang hiển thị:').parentElement).toHaveTextContent('0');
});

test('sorts matching movies by rating in either direction', () => {
  render(<App />);
  const searchInput = screen.getByRole('searchbox', { name: /tìm phim/i });
  const genreFilter = screen.getByRole('combobox', { name: /lọc theo thể loại/i });
  const sortFilter = screen.getByRole('combobox', { name: /sắp xếp phim/i });
  const getMovieTitles = () => screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

  fireEvent.change(searchInput, { target: { value: 'the' } });
  fireEvent.change(sortFilter, { target: { value: 'rating-desc' } });
  expect(getMovieTitles()).toEqual(['The Dark Knight', 'The Grand Budapest Hotel']);

  fireEvent.change(sortFilter, { target: { value: 'rating-asc' } });
  expect(getMovieTitles()).toEqual(['The Grand Budapest Hotel', 'The Dark Knight']);

  fireEvent.change(genreFilter, { target: { value: 'Action' } });
  expect(getMovieTitles()).toEqual(['The Dark Knight']);
});

test('shows one selected movie detail at a time and closes it', () => {
  render(<App />);
  const detailButtons = screen.getAllByRole('button', { name: /chi tiết/i });

  fireEvent.click(detailButtons[0]);
  expect(screen.getAllByRole('dialog')).toHaveLength(1);
  expect(screen.getByRole('dialog')).toHaveTextContent('Interstellar');
  expect(screen.getByRole('dialog')).toHaveTextContent('Christopher Nolan');
  expect(screen.getByRole('dialog').querySelector('img')).toBeNull();

  fireEvent.click(detailButtons[1]);
  expect(screen.getAllByRole('dialog')).toHaveLength(1);
  expect(screen.getByRole('dialog')).toHaveTextContent('Spirited Away');
  expect(screen.getByRole('dialog')).not.toHaveTextContent('Interstellar');

  fireEvent.click(screen.getByRole('button', { name: 'Đóng chi tiết' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
