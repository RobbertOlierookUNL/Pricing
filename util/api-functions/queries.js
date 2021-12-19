import { query } from "../../lib/db";

export const getValidEans = async () => {
	const results = await query(/* sql */`
 	SELECT DISTINCT ProductEan FROM athena_rsp_price
	WHERE Price > 0
	AND ActualAssortment = 1.0
 	`, );
	return results.map(e => parseInt(e.ProductEan));
};

export const getSwitchIds = async (eans) => {
	console.log({eans, t: typeof eans[0]});
	const results = await query(/* sql */`
	SELECT ZcuEanCode, MRDR, SwitchId, Active FROM athena_rsp_switch
	WHERE SwitchId IN (
	 	SELECT DISTINCT SwitchId FROM athena_rsp_switch
		WHERE ZcuEanCode IN (${eans.map(() => "?").toString()})
	)
 	`, eans.map(e => parseInt(e)));
	return results;
};

export const getProducts = async (eans) => {
	return await query(/* sql */`
    SELECT DISTINCT ZcuEanCode, ProductCode FROM athena_rsp_product
    WHERE ZcuEanCode IN (${eans.map(() => "?").toString()})
    `, eans);
};

export const getRelevantEansFromConcept = async (category, thisBrand, thisConcept, categoryInfo) => {
	const {brand, concept, vol_time, min_vol} = categoryInfo;


	const results = await query(/* sql */`
    SELECT DISTINCT ZcuEanCode, ProductCode FROM athena_rsp_product
    WHERE ${concept} IN (${thisConcept.map(() => "?").toString()})
    AND ${brand} = ?
    AND ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
    AND (
			ProductCode IN (
	      SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
	      WHERE ${vol_time} > ${min_vol}
	    )
		)
    ORDER BY ProductBrandName
    `, [...thisConcept, thisBrand, ...category]);

	const eanToMrdrs = {};
	results.forEach(e => {
		const ean = parseInt(e.ZcuEanCode);
		if (eanToMrdrs[ean]) {
			eanToMrdrs[ean].push(e.ProductCode);
		} else {
			eanToMrdrs[ean] = [e.ProductCode];
		}
	});

	return {eans: Object.keys(eanToMrdrs), eanToMrdrs};
};

export const getRelevantEansFromBrand = async (category, thisBrand, categoryInfo) => {
	const {brand, vol_time, min_vol} = categoryInfo;


	const results = await query(/* sql */`
    SELECT DISTINCT ZcuEanCode, ProductCode FROM athena_rsp_product
    WHERE ${brand} = ?
    AND ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
    AND (
			ProductCode IN (
	      SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
	      WHERE ${vol_time} > ${min_vol}
	    )
		)
    ORDER BY ProductBrandName
    `, [thisBrand, ...category]);
	const eanToMrdrs = {};
	results.forEach(e => {
		const ean = parseInt(e.ZcuEanCode);
		if (eanToMrdrs[ean]) {
			eanToMrdrs[ean].push(e.ProductCode);
		} else {
			eanToMrdrs[ean] = [e.ProductCode];
		}
	});

	return {eans: Object.keys(eanToMrdrs), eanToMrdrs};

};

export const getRelevantEansFromCategory = async (category, categoryInfo) => {
	const {vol_time, min_vol} = categoryInfo;


	const results = await query(/* sql */`
    SELECT DISTINCT ZcuEanCode, ProductCode FROM athena_rsp_product
    WHERE ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
    AND (
			ProductCode IN (
	      SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
	      WHERE ${vol_time} > ${min_vol}
	    )
		)
    ORDER BY ProductBrandName
    `, [...category]);
	const eanToMrdrs = {};
	results.forEach(e => {
		const ean = parseInt(e.ZcuEanCode);
		if (eanToMrdrs[ean]) {
			eanToMrdrs[ean].push(e.ProductCode);
		} else {
			eanToMrdrs[ean] = [e.ProductCode];
		}
	});

	return {eans: Object.keys(eanToMrdrs), eanToMrdrs};
};

export const getCompetitorProducts = async (cluster, smallC) => {

	return await query(/* sql */`
    SELECT Cluster, Small_C, EAN, IPV_ID FROM athena_advicetool_competitors
    WHERE Small_C IN (${smallC.map(() => "?").toString()})
    AND Cluster = ?
    `, [...smallC, cluster]);
};

export const getAllProducts = async (category, categoryInfo) => {
	const {vol_time, min_vol} = categoryInfo;

	return await query(/* sql */`
		SELECT DISTINCT ZcuEanCode FROM athena_rsp_product
    WHERE ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
    AND ProductCode IN (
      SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
      WHERE ${vol_time} > ${min_vol}
    )
    ORDER BY ProductBrandName
    `, category);
};

export const getAllProductsFromBrand = async (category, thisBrand, categoryInfo) => {
	const {brand, vol_time, min_vol} = categoryInfo;

	return await query(/* sql */`
		SELECT DISTINCT ZcuEanCode FROM athena_rsp_product
    WHERE ${brand} = ?
    AND ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
    AND ProductCode IN (
      SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
      WHERE ${vol_time} > ${min_vol}
    )
    ORDER BY ProductBrandName
    `, [thisBrand, ...category]);
};

export const getAllCompetitorProductsFromBrand = async (cluster) => {

	return await query(/* sql */`
    SELECT Cluster, Small_C, EAN, IPV_ID FROM athena_advicetool_competitors
    WHERE Cluster = ?
    `, [cluster]);
};

export const getAllDetailedProducts = async (category, categoryInfo) => {
	const {brand, concept, vol_time, min_vol} = categoryInfo;

	return await query(/* sql */`
    SELECT ZcuEanCode, ProductCode, ${concept}, ${brand} FROM athena_rsp_product
    WHERE ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
    AND ProductCode IN (
      SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
      WHERE ${vol_time} > ${min_vol}
    )
    ORDER BY ${brand}
    `, category);
};

export const getCompetitorInfo = async () => {
	return await query(/* sql */`
    SELECT Cluster, Small_C, EAN, IPV_ID FROM athena_advicetool_competitors
    ORDER BY Cluster
    `,);
};

export const getMeasurements = async (eans, dateObjects) => {
	if (eans.length > 0) {
		const dates = [...new Set(Object.values(dateObjects))];
		// console.log(`  SELECT p.*, p.Date AS priceDate FROM athena_rsp_price p
		//   WHERE p.ProductEan IN (${eans.join(", ")})
		//   AND p.Date IN (${dates.join(", ")})
		// 	AND p.ActualAssortment = 1.0`);
		return await query(/* sql */`
			SELECT p.*, p.Date AS priceDate FROM athena_rsp_price p
			WHERE p.ProductEan IN (${eans.map(() => "?").toString()})
			AND p.Date IN (${dates.map(() => "?").toString()})
			AND p.ActualAssortment = 1.0
		`, [...eans, ...dates]);
	}
	return [];

};

export const getCompetitorMeasurements = async (ids, dateObjects) => {
	const dates = [...new Set(Object.values(dateObjects))];
	return await query(/* sql */`
    SELECT p.*, p.Date AS priceDate FROM athena_rsp_price p
    WHERE MeasurementID IN (${ids.map(() => "?").toString()})
    AND Date IN (${dates.map(() => "?").toString()})
		AND ActualAssortment = 1.0
  `, [...ids, ...dates]);

};

export const getVolumes = async (mrdrs) => {
	if (mrdrs.length > 0) {
		return await query(/* sql */`
			SELECT * FROM athena_rsp_volume
			WHERE ESRA_Product IN (${mrdrs.map(() => "?").toString()})
		`, mrdrs);
	}
	return [];
};


export const getRetailers = async (cat) => {
	return await query(/* sql */`
		SELECT
		r.retailer, r.title, r.formalTitle, r.cap, r.adviceCap, r.priority, r.show, r.nasa, r.marketLeader,
		p.email, p.first_name, p.last_name,
		s.email AS sdEmail,
		s.first_name AS sdFirstName,
		s.last_name AS sdLastName
		FROM athena_advicetool_retailers r
		LEFT JOIN athena_advicetool_people p ON r.${cat} = p.id
		LEFT JOIN athena_advicetool_people s ON r.sd = s.id

	`);
};

export const getConcepts = async (category, thisBrand, categoryInfo, validEans) => {
	const {brand, concept, vol_time, min_vol} = categoryInfo;
	const results = await query(/* sql */`
	SELECT DISTINCT ${concept}
	FROM athena_rsp_product
	WHERE ${brand} = ?
	AND ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
	AND ProductCode IN (
		SELECT DISTINCT ESRA_Product
		FROM athena_rsp_volume
		WHERE ${vol_time} > ${min_vol}
	)
	AND	ZcuEanCode IN (${validEans.map(() => "?").toString()})
	ORDER BY ProductBrandFormName

`, [thisBrand, ...category, ...validEans]
	);
	return results.map(o => o[concept]);
};

export const getCompetitorConcepts = async (brand) => {
	const results = await query(/* sql */`
		SELECT DISTINCT Small_C FROM athena_advicetool_competitors
		WHERE Cluster = ?
		ORDER BY Small_C
`, brand,
	);
	return results.map(o => o.Small_C);
};

export const getBrands = async (category, categoryInfo, validEans) => {
	const {brand, vol_time, min_vol} = categoryInfo;
	const results = await query(/* sql */`
		SELECT DISTINCT ${brand} FROM athena_rsp_product
		WHERE ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
		AND ProductCode IN (
			SELECT DISTINCT ESRA_Product FROM athena_rsp_volume
			WHERE ${vol_time} > ${min_vol}
		)
		AND	ZcuEanCode IN (${validEans.map(() => "?").toString()})
		ORDER BY ProductBrandName
`, [...category, ...validEans]
	);
	return results.map(o => o[brand]);
};

export const getCompetitorBrands = async () => {
	const results = await query(/* sql */`
		SELECT DISTINCT Cluster FROM athena_advicetool_competitors
		ORDER BY Cluster
`,
	);
	return results.map(o => o.Cluster);
};




export const getCategories = async (category) => {
	console.log({category});
	const results = await query(/* sql */`
	SELECT vanguard_category FROM athena_advicetool_mapping_category
	WHERE tool_category = ?
`, category
	);
	console.log({results});
	const myResults = results.map(o => o.vanguard_category);
	return myResults;
};

export const getCategoryInfo = async (category) => {
	const results = await query(/* sql */`
	SELECT brand, concept, description, vol_time, min_vol FROM athena_advicetool_category
	WHERE category = ?
`, category
	);
	const myResults = results[0];
	return myResults;
};

export const getConceptNicknames = async (cat, brand) => {
	return await query(/* sql */`
		SELECT concept, nickname FROM athena_advicetool_concept_nicknames
		WHERE cluster = ?
		AND brand = ?
`, [cat, brand]);
};

export const getAllConceptNicknames = async (cat) => {
	return await query(/* sql */`
		SELECT concept, brand, nickname FROM athena_advicetool_concept_nicknames
		WHERE cluster = ?
`, [cat]);
};

export const upsertConceptNickame = async (concept, cluster, brand, nickname) => {
	return await query(/* sql */`
		INSERT INTO athena_advicetool_concept_nicknames (concept, cluster, brand, nickname)
		VALUES (?, ?, ?, ?)
		ON DUPLICATE KEY UPDATE cluster = ?, brand = ?, nickname = ?
		`, [concept, cluster, brand, nickname, cluster, brand, nickname]
	);
};

export const upsertAdvicePrices = async (ean, adviceH, adviceL) => {
	return await query(/* sql */`
		INSERT INTO athena_advicetool_ean_config (ean, adviceH, adviceL)
		VALUES (?, ?, ?)
		ON DUPLICATE KEY UPDATE adviceH = ?, adviceL = ?
		`, [ean, adviceH, adviceL, adviceH, adviceL]
	);
};

export const deleteConceptNickame = async (concept, cluster, brand) => {
	return await query(/* sql */`
		DELETE FROM athena_advicetool_concept_nicknames
		WHERE concept = ?
		AND cluster = ?
		AND brand = ?
		`, [concept, cluster, brand]
	);
};

export const getPeople = async () => {
	return await query(/* sql */`
		SELECT id, email, first_name, last_name
		FROM athena_advicetool_people
`);
};

export const insertPerson = async (email, first_name, last_name) => {
	return await query(/* sql */`
		INSERT INTO athena_advicetool_people
		(email, first_name, last_name)
		VALUES (?, ?, ?)
`, [email, first_name, last_name]);
};

export const updatePerson = async (id, email, first_name, last_name) => {
	return await query(/* sql */`
		UPDATE athena_advicetool_people
		SET email = ?, first_name = ? , last_name = ?)
		WHERE id = ?
`, [email, first_name, last_name, id]);
};

export const deletePerson = async id => {
	return await query(/* sql */`
		DELETE FROM athena_advicetool_people
		WHERE id = ?
		`, [id]
	);
};
