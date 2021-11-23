import { query } from "../../lib/db";

export const getProducts = async (category, brand, concept) => {
	return await query(/* sql */`
    SELECT ProductEnglishName, ZcuEanCode, ProductCode FROM athena_rsp_product
    WHERE ProductBrandFormName = ?
    AND ProductBrandName = ?
    AND ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
    AND ProductCode IN (
      SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
      WHERE 1M_Volume > 0
    )
    ORDER BY ProductBrandName
    `, [concept, brand, ...category]);
};

export const getAllProducts = async (category) => {
	return await query(/* sql */`
    SELECT ProductEnglishName, ZcuEanCode, ProductCode FROM athena_rsp_product
    WHERE ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
    AND ProductCode IN (
      SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
      WHERE 1M_Volume > 0
    )
    ORDER BY ProductBrandName
    `, category);
};

export const getAllProductsFromBrand = async (category, brand) => {
	return await query(/* sql */`
    SELECT ProductEnglishName, ZcuEanCode, ProductCode FROM athena_rsp_product
    WHERE ProductBrandName = ?
    AND ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
    AND ProductCode IN (
      SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
      WHERE 1M_Volume > 0
    )
    ORDER BY ProductBrandName
    `, [brand, ...category]);
};

export const getAllDetailedProducts = async (category) => {
	return await query(/* sql */`
    SELECT ProductEnglishName, ZcuEanCode, ProductCode, ProductBrandFormName, ProductBrandName FROM athena_rsp_product
    WHERE ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
    AND ProductCode IN (
      SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
      WHERE 1M_Volume > 0
    )
    ORDER BY ProductBrandName
    `, category);
};

export const getMeasurements = async (eans, dateObjects) => {
	const dates = [...new Set(Object.values(dateObjects))];
	console.log({dates});
	return await query(/* sql */`
    SELECT p.*, p.Date AS priceDate FROM athena_rsp_price p
    WHERE ProductEan IN (${eans.map(() => "?").toString()})
    AND Date IN (${dates.map(() => "?").toString()})
		AND ActualAssortment = 1.0
  `, [...eans, ...dates]);
};

export const getVolumes = async (mrdrs) => {
	return await query(/* sql */`
		SELECT * FROM athena_rsp_volume
		WHERE ESRA_Product IN (${mrdrs.map(() => "?").toString()})
	`, mrdrs);
};

export const getRetailers = async (cat) => {
	return await query(/* sql */`
		SELECT
		r.retailer, r.title, r.formalTitle, r.cap, r.priority, r.show, r.nasa, r.marketLeader,
		p.email, p.first_name, p.last_name,
		s.email AS sdEmail,
		s.first_name AS sdFirstName,
		s.last_name AS sdLastName
		FROM athena_advicetool_retailers r
		LEFT JOIN athena_advicetool_people p ON r.${cat} = p.id
		LEFT JOIN athena_advicetool_people s ON r.sd = s.id

	`);
};

export const getCategories = async (category) => {
	console.log({category});
	const results = await query(/* sql */`
	SELECT vanguard_category FROM athena_advicetool_mapping_category
	WHERE tool_category = ?
`, category
	);
	const myResults = results.map(o => o.vanguard_category);
	return myResults;
};
