import mysql.connector


def write_file(data, filename):
    # Convert binary data to proper format and write it on Hard Disk
    with open(filename, 'wb') as file:
        file.write(data)


def readBLOB(emp_id, photo):
    print("Reading BLOB data from python_employee table")

    try:
        connection = mysql.connector.connect(host='localhost',
                                             database='lockshop_db',
                                             user='root',
                                             password='uscfpmlockshop')

        cursor = connection.cursor()
        sql_fetch_blob_query = """SELECT picture from doors where picture is not null"""

        cursor.execute(sql_fetch_blob_query, (emp_id,))
        record = cursor.fetchall()
        for row in record:
            image = row[0]
            print(image)
            print("writing image")
            write_file(image, photo)

    except mysql.connector.Error as error:
        print("Failed to read BLOB data from MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


readBLOB(1, "/Users/vibhavshashankdeshpande/Documents/lkshop_application/door-inspection-ui/src/components/photo.png")