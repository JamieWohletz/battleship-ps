module Draw where

import Text.Smolder.HTML as H
import Text.Smolder.Markup as M
import Battleship (Board, Point(..), TileType, tileAt, unwrapTile, getType)
import Data.Array ((..))
import Data.Foldable (foldMap)
import Data.Maybe (Maybe(..))
import Prelude (show, ($), (<>))
import Text.Smolder.HTML.Attributes (className)
import Text.Smolder.Markup ((!))

boardToHtml :: forall e. Partial => Board -> M.Markup e
boardToHtml board@{ grid, width, height } = 
  H.table ! className "board" $ foldMap (row board) (0..height)

row :: forall e. Partial => Board -> Int -> M.Markup e
row (board@{ width }) rowIndex = H.tr ! className "row" $ foldMap (cell board rowIndex) (0..width)

cell :: forall e. Partial => Board -> Int -> Int -> M.Markup e
cell board rowIndex colIndex = H.td ! className (cellClass tileType) $ M.text ""
  where tileType = getType $ unwrapTile $ tileAt (Point {x: colIndex, y: rowIndex}) board

cellClass :: TileType -> String
cellClass tileType = "cell " <> show tileType

