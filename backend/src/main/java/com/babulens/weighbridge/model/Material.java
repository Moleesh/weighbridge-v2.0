package com.babulens.weighbridge.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private String materialId;
    private String material;

    public Material() {
    }

    public Material(int id, String materialId, String material) {
        this.id = id;
        this.materialId = materialId;
        this.material = material;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMaterialId() {
        return materialId;
    }

    public void setMaterialId(String materialId) {
        this.materialId = materialId;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Material)) return false;
        Material material = (Material) o;
        return getId() == material.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Material{" +
                "id=" + id +
                ", materialId='" + materialId + '\'' +
                ", material='" + material + '\'' +
                '}';
    }
}
