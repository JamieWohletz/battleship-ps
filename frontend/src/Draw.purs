module Draw where

import Text.Smolder.HTML as H
import Text.Smolder.Markup as M
import Battleship (Board)
import Data.Array ((..))
import Data.Foldable (foldMap)
import Data.Maybe (Maybe(..))
import Prelude (show, ($), (<>))
import Text.Smolder.HTML.Attributes (className)
import Text.Smolder.Markup ((!))

boardToHtml :: forall e. Maybe Board -> M.Markup e
boardToHtml Nothing = H.table $ M.text ""
boardToHtml (Just { grid, width, height }) = 
  H.table $ foldMap row (0..height)
    where row i = H.tr $ foldMap (cell i) (0..width)
          cell i j = H.td M.! className "cell" $ M.text $ show i <> ", " <> show j
