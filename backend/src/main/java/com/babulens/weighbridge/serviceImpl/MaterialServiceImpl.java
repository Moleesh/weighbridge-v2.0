package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.Material;
import com.babulens.weighbridge.repository.MaterialDAO;
import com.babulens.weighbridge.service.MaterialService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private
    MaterialDAO materialDAO;

    @Override
    public List<Material> getAllMaterial() {
        return Lists.newArrayList(materialDAO.findAll());
    }

    @Override
    public Material addUpdateMaterial(Material material) {
        return materialDAO.save(material);
    }

    @Override
    public void deleteMaterial(int id) {
        materialDAO.deleteById(id);
    }
}
