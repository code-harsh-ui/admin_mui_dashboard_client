import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
// using the reduxtoolkitquery function from api to fetch the "api"
import { useGetProductsQuery } from "state/api";

//!------------------ This is the first component in which we have only box with grid properties ------------------------
const Products = () => {
  //! destructuring  "data" and "isLoading" from the whole object it means we get bunch of objects in respsonse like "status, currentData, iserror, isloading" and many more we are only extracting the "data" and "isLoading" from the whole object and using it in our application
  const { data, isLoading } = useGetProductsQuery();
  // useMediaQurery will return a boolean if it matches the following condition of if the screen size is 1000px and more
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box m="1.5rem 2.5rem">
      {/* Heading */}
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {/* All the boxes */}
      {/* //! If data return "true" if not (null, undefined) or isLoading is "false" then it will return the <box> element else it will return the loading text we did this using ternary operator and the data here is which we've destructure above from the "response" object */}
      {data || !isLoading ? (
        //! Consider this box as a one big box like parent "div" which have property of "display: grid" so that all the child "divs" will be arranged in row and coloumn and here the child divs are "<Product>" component which is basically a card component which we have in "map" function and also we are passing props to the <Product/> component
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {/* Firstly we are are destructuring the keys from the object (data which is coming from api) id, name, description etc and injecting and passing that value to <product> component as a prop id={id} name={name} etc and //! and also we are iteratng that <product> component using "Map" function it will help to render the cards one by one in the webpage  */}
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

// !---------------------------- This is the second component where we have "MUI CARDS" component in it-------------------------
const Product = ({
  // fetching all the props which we have passed in <product> above in map function
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  //   to use collapse functionality mentioned in mui card component check docs for more clarification
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    // Here we have card component imported from "MUI"
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {/* fetching the prop "category" which is coming from "api" */}
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {/* fetching the prop "name" which is coming from "api" */}
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {/* fetching the prop "price" which is coming from "api" */}$
          {Number(price).toFixed(2)}
        </Typography>
        {/* fetching the prop "rating" which is coming from "api" */}
        <Rating value={rating} readOnly />
        {/* fetching the prop "descripton" which is coming from "api" */}
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      {/* For collapse section */}
      <CardActions>
        <Button
          variant="primary"
          size="small"
          // this function will always set the "isExpanded" value opposite to the current value it allows to toggle the menu when clicked
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        // It will set the current state "value" "true" to make the card uncollapsed and "false" to make the card collapsed
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          {/* fetching the prop "id" from the api */}
          <Typography>id: {_id}</Typography>
          {/* fetching the prop "id" from the api */}
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            {/* fetching the prop "stat" from the api */}
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            {/* fetching the prop "stat" from the api */}
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Products;
