package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.entity.Material;

import java.util.List;

public interface MaterialService {

    List<Material> getAllMaterials();

    Material addUpdateMaterial(Material material);

    void deleteMaterial(int id);

}
