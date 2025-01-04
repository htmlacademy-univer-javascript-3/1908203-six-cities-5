import { Offer } from '../../types/offer';
import { FavoritesEmptyList } from '../../components/favorites/favorites-empty-list';
import { LoadingScreen } from '../../components/loading/loading-screen';
import { FavoritePageContent } from '../../components/favorites/favorite-page-content';
import { FavoriteAction } from '../../types/favorite-action';

export type FavoritesPageProps = {
  offers: Offer[] | undefined;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
};

export function FavoritesPage({ offers, onFavoriteStatusChanged }: FavoritesPageProps) {
  if (offers === undefined) {
    return (<LoadingScreen />);
  }

  const isEmpty = offers.length <= 0;

  return (
    <main className={`page__main page__main--favorites ${isEmpty && 'page__main--favorites-empty'}`}>
      <div className="page__favorites-container container">
        {
          isEmpty
            ? <FavoritesEmptyList />
            :
            <FavoritePageContent
              offers={offers}
              onFavoriteStatusChanged={onFavoriteStatusChanged}
            />
        }
      </div>
    </main>
  );
}
