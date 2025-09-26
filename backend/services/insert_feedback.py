from db.connection import create_connection


def insert_feedback(customer_name, message_text, notes, category, franchise_unit=None):

    conn = create_connection()  # Function to connect to db
    cursor = conn.cursor()  # Object which executes the db codes

    sql = "INSERT INTO feedbacks (customer_name, message_text, notes, category, franchise_unit) VALUES (%s, %s, %s, %s, %s)"  # Query

    print("Receveid notes:", notes)
    
    cursor.execute(sql, (customer_name, message_text, notes, category, franchise_unit))
    conn.commit()  # Confirm; Save the new line on db
    inserted_id = cursor.lastrowid
    cursor.close()  # Close the cursor
    conn.close()  # Close the db connection
    return inserted_id
