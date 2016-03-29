class RemoveCategoryColumnFromWorkouts < ActiveRecord::Migration
  def change
    remove_column :workouts, :category
    remove_column :workouts, :category_id
  end
end
