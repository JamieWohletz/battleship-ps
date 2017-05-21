module Battleship where

import Data.Array ((..))
import Data.Either (Either(..))
import Data.Functor (map)
import Data.Map (Map, empty, insert, lookup)
import Data.Maybe (Maybe(..))
import Data.Ordering (Ordering(..))
import Data.Traversable (foldl)
import Prelude (class Eq, class Ord, class Show, otherwise, show, ($), (&&), (<), (<>), (==), (>), (||))

data TileType = Ocean | Ship
data Tile = Tile {
  tileType :: TileType,
  attacked :: Boolean
}

instance showTileType :: Show TileType where
  show Ocean = "ocean"
  show Ship = "ship"

newtype Point = Point { x :: Int, y :: Int }
instance eqPoint :: Eq Point where
  eq (Point { x, y }) (Point { x: x2, y: y2}) = x == x2 && y == y2

instance ordPoint :: Ord Point where
  compare p1@(Point { x, y }) p2@(Point { x: x2, y: y2}) 
    | p1 == p2 = EQ
    | x < x2 || y < y2 = LT
    | otherwise = GT

instance showPoint :: Show Point where
  show (Point { x, y }) = "(" <> (show x) <> ", " <> (show y) <> ")"

type Grid = Map Point Tile

type Board = {
  grid :: Grid,
  width :: Int,
  height :: Int
}

ocean :: Tile
ocean = Tile {
  tileType: Ocean,
  attacked: false
}

emptyGrid :: Grid
emptyGrid = empty

boardRec :: Int -> Int -> Grid -> Board 
boardRec width height grid = { width, height, grid }

board :: Int -> Int -> Board
board w h
  | w < 0 || h < 0 = boardRec w h emptyGrid
  | otherwise = boardRec w h $ fillGrid w h

fillGrid :: Int -> Int -> Grid
fillGrid w h = foldl fillRow emptyGrid (0..h) 
  where fillRow g rowIndex = foldl (\grid colIndex -> insert (Point {x: colIndex, y: rowIndex}) ocean grid) g (0..w)

attack :: Point -> Board -> Either String Board
attack p bd@{ grid } = ret $ tileAt p bd
  where
    ret Nothing = Left "Error! Bad tile position."
    ret (Just (Tile tile)) = Right $ bd {
      grid = (insert p newTile grid)
    }
      where 
        newTile = Tile $ tile { attacked = true }

getType :: Tile -> TileType
getType (Tile {tileType}) = tileType

unwrapTile :: Partial => Maybe Tile -> Tile
unwrapTile (Just t) = t

tileAt :: Point -> Board -> Maybe Tile
tileAt p@(Point { x, y }) { width, height, grid } = lookup p grid

