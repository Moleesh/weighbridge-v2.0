package com.babulens.weighbridge.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Material {
    @Id
    private String material;
    private int cost;

    public Material() {
    }

    private String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Material)) {
            return false;
        }
        Material material1 = (Material) o;
        return getMaterial().equals(material1.getMaterial());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getMaterial());
    }

    @Override
    public String toString() {
        return "Material{" +
                "material='" + material + '\'' +
                ", cost=" + cost +
                '}';
    }
}
