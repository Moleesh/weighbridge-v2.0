package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.Material;

import java.util.List;

public interface MaterialService {

	List<Material> getAllMaterial ();

	Material addUpdateMaterial (Material material);

	void deleteMaterial (int id);
}
